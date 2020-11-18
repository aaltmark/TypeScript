// Drag and Drop Project 

// Drag and Drop Interfaces 
interface Draggable {
    dragStartHandler(event: DragEvent): void //will not return anything
    dragEndHandler(event: DragEvent): void
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void //permit the drop - signal that the thing is a valid target 
    dropHandler(event: DragEvent): void //react to drop
    dragLeaveHandler(event: DragEvent): void //visual feedback to revert update 
}

// Project Type -----------------------------------------------------------
// to build project objects that have the same structure 

enum ProjectStatus { Active, Finished } //used as union for status in project class below

class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {

    }
}

// Project State Management -----------------------------------------------

type Listener<T> = (items: T[]) => void; //takes in a project array and dont care about return value. Use generic type 

class State<T> {
    protected listeners: Listener<T>[] = [] //protected cannot be accessed from outside but from inherited classes 

    addListener(listenerFn: Listener<T>) { //listener type
        this.listeners.push(listenerFn)
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = []
    private static instance: ProjectState

    // private so we can only reference inside the class and can't make an instance from outside 
    private constructor() {
        super()
    }

    // we only want 1 instance so this will 
    static getInstance() {
        if (this.instance) { 
            return this.instance //return the existing instance 
        }
        this.instance = new ProjectState() //or make the 1 and only instance 
        return this.instance
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active) //using project class 
        this.projects.push(newProject) //add it to the projects array 
        this.updateListeners()
        for (const listenerFn of this.listeners) { //loop through all listeners 
            listenerFn(this.projects.slice()) //copy of 
        }
    }

    // used to change prj from active to finished 
    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId)// find proj within array of proj
        if (project && project.status !== newStatus) { //if it exists and the status is new (dragged it to other side)
            project.status = newStatus //change it to whatever is passed in 
            this.updateListeners() //trigger listener so we can rerender items based on new status 
        }
    }

    private updateListeners(){
        for (const listenerFn of this.listeners) { //loop through all listeners 
            listenerFn(this.projects.slice()) //copy of 
        }
    }
}

const projectState = ProjectState.getInstance() //global constant you can use anywhere. this will be the 1 instance. call with method instead of 'new' because constructor is not available 

// --------------------------------------
// Validation Logic - could do custom type or interface (structure of obj is good for interface)
interface Validatable {
    value: string | number //title, description, people 
    required?: boolean; //? = optional. boolean or undefined 
    minLength?: number; //length of string 
    maxLength?: number; 
    min?: number; //value of # 
    max?: number; 
}

function validate(validatableInput: Validatable) { //gets an obj that has the interface structure
    let isValid = true; //default assumption 
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0//check if it is empty 
    }  //will remain true if length is not 0 

    // check strings 
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') { //Type Guard - minlength used for strings, wouldnt need to check otherwise
        isValid = isValid && validatableInput.value.length > validatableInput.minLength
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') { 
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength
    }

    // check numbers 
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min
    } 
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max
    } 
    return isValid 
}

// autobind decorator 
// used to set THIS keyword passed to submitHandler from configure rn
function Autobind(_:any, _2: string, descriptor: PropertyDescriptor) { // 3 args - target, methodName, and descriptor. target and method name are not used which is why we put _ 
    const originalMethod = descriptor.value //guess descriptor is OG method
    const adjDescriptor: PropertyDescriptor = {
        configurable: true, //we can always change
        get() { //getter method 
            const boundFn = originalMethod.bind(this) //so new method we call it on will have same THIS as the OG method 
            return boundFn
        }
    }
    return adjDescriptor
}

// Component Base Class -----------------------------------------------
// UI components - generic class. abstract so we can't instantiate

abstract class Component<T extends HTMLElement, U extends HTMLElement> {  
    templateElement: HTMLTemplateElement; //template - dom inside lib in json file so it's a TS type 
    hostElement: T; 
    element: U;  

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) { //new element is optional
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement; //what we're trying to find will be passed in
        this.hostElement = document.getElementById(hostElementId)! as T; //reference to element to render template content 

        const importedNode = document.importNode(this.templateElement.content, true) //property on HTMLTemplateElement. True for deep clone 
        this.element = importedNode.firstElementChild as U; 
        if (newElementId) { //optional arg so check if it exists first
            this.element.id = newElementId; //based on what's passed in 
        }

        this.attach(insertAtStart)
    }

    private attach(insertAtBeginning: boolean){
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element) //insert right at beginning of opening tag
    }

    // each class that inherits will have these methods and implementation is owned by iinheriting class 
    abstract configure(): void; 
    abstract renderContent(): void; 
}

// Make form visible | render form in 'app' div 

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // interacting with DOM elements 
    titleInputElement: HTMLInputElement; 
    descriptionInputElement: HTMLInputElement; 
    peopleInputElement: HTMLInputElement; 

    constructor() {
        super('project-input', 'app', true, 'user-input')

        // access to all elements in form
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement; 
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement; 
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement; 

        this.configure() //will trigger whenever form is submitted
    }

    // working with form 
    configure() {
        this.element.addEventListener('submit', this.submitHandler) 
    }

    renderContent() {} //required by base class 

    // clear out input fields after submission 
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = ''; 
        this.peopleInputElement.value = ''
    }

    @Autobind //need to uncomment out 'experimentalDecorators' in tson so THIS in submitHandler will be the same as THIS in this fn (the class)
    private submitHandler(event: Event) {//private so can only access from inside class
        event.preventDefault(); 
        const userInput = this.gatherUserInput()

        // check if validation says it's good 
        if (Array.isArray(userInput)) { //validation from gatherUserInput will return tuple (array)
            const [title, desc, people] = userInput
            projectState.addProject(title, desc, people) //adds project to array 
            this.clearInputs() //empty form
        }
    }

    // reach out to all inputs, validate and return it for form 
    private gatherUserInput(): [string, string, number] | void { //return type is a tuple or void if we error alert and just return 
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enteredPeople = this.peopleInputElement.value

        // validate 
        const titleValidatable: Validatable = { //will be of type Validatable that is an obj that has properties
            value: enteredTitle, 
            required: true //to check if not empty
        }
        const descriptionValidatable: Validatable = { 
            value: enteredDescription, 
            required: true, //to check if not empty
            minLength: 5 //for strings 
        }
        const peopleValidatable: Validatable = { 
            value: +enteredPeople, //convert to + 
            required: true, //to check if not empty
            min: 0, //min for #s
            max: 6
        }

        if ( //if one of them are false
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!')
            return //void return 
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople] //tuple return
        }
    }
}

// ProjectItem Class ----------- renders each item ---------------------------

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable { //have to add draggable fn 
    private project: Project; 

    // getter so we can output people/person 
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} people`
        }
    }

    constructor(hostId: string, project: Project) { //id where item should be rendered in (not fixed b.c 2 lists)
        super('single-project', hostId, false, project.id) 
        this.project = project

        this.configure()
        this.renderContent()
    }

    @Autobind //so THIS refers to right 
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id) //on the property can attach data to dragEvent. 
        event.dataTransfer!.effectAllowed = 'move' //controls what cursor looks like   
    }

    dragEndHandler(_: DragEvent){
    }

    configure() { //will help with drag 
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndHandler)
    } //required by base 

    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title //rendered Li
        this.element.querySelector('h3')!.textContent = this.persons + '  assigned' //calls getter method 
        this.element.querySelector('p')!.textContent = this.project.description 

    }
}

// Render Lists of Projects ---------------------------------------------------

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{ //those are the T, U
    assignedProjects: Project[] //proj class

    constructor(private type: 'active' | 'finished'){ //auto creates property called type and we will have either active or finished projects
        super('project-list', 'app', false, `${type}-projects`) //id of template, host, insert at start? (false), new element id 

        this.assignedProjects = []
        this.configure()
        this.renderContent()
    }

    // fires when enter a draggable area with mouse 
    @Autobind
    dragOverHandler(event: DragEvent){
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') { //what we set up in drag start handler 
            event.preventDefault() //drag and drop is only allowed on element if in dragover you call this 
            const listEl = this.element.querySelector('ul')!
            listEl.classList.add('droppable') //for css purposes 
        }
    }

    @Autobind
    dropHandler(event: DragEvent){
        const prjId = event.dataTransfer!.getData('text/plain') //extract id 
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished) //pass in status where we dropped it 
    }

    // fires when leave element with dragged element 
    @Autobind
    dragLeaveHandler(_: DragEvent){
        const listEl = this.element.querySelector('ul')!
        listEl.classList.remove('droppable') //for css purposes 
    }



    configure() {
        // make sure drag events are fired 
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)

        projectState.addListener((projects: Project[]) => { //will take in an array of projects
            //filter first 
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.Finished
            })
            this.assignedProjects = relevantProjects; 
            this.renderProjects()
        })
    }

    // fill blank spaces on template
    renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId //section is element

        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS' //type is active or finished
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '' //get rid of all list items before rerendering so we don't duplicate 

        for (const prjItem of this.assignedProjects) { //for each project in the array 
           new ProjectItem(this.element.querySelector('ul')!.id, prjItem) //create a new item and attach to ul  
        }
    }
}

// instantiation section --------------------------------------
const prjInput = new ProjectInput(); 
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')


 