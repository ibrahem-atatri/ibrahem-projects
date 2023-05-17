"use strict"
const ps=require('prompt-sync');
 const prompt=ps({sigint:true});
class Task{
    #taskName;
    #taskDeadLine;
    #taskPriority;
    #taskDone;
    constructor(taskName, taskDeadLine,taskPriority)
    {
        this.#taskName=taskName;
        this.#taskDeadLine=taskDeadLine;
        this.#taskPriority=taskPriority.toUpperCase()=='YES'? true:false;
        this.#taskDone=false;
    }
    set taskNameValue(taskName)
    {
        this.#taskName=taskName;
    }
    get taskNameValue()
    {
        return this.#taskName
    }
    set taskDeadLineValue(taskDeadLine){
        this.#taskDeadLine=taskDeadLine;
    }
    get taskDeadLineValue(){
        return this.#taskDeadLine;
    }
    set taskPriorityValue(taskPriority){
        this.#taskPriority=taskPriority.toUpperCase()=='YES';
    }
    get taskPriorityValue(){
        return this.#taskPriority;
    }
    set taskDoneValue(taskDone){
        
        this.#taskDone=taskDone;
    }
    get taskDoneValue(){
        return this.#taskDone;
    }
    printTask(){
    return(`Task name:- ${this.#taskName}, Task Deadline:- ${this.#taskDeadLine.getFullYear()},${(this.#taskDeadLine.getMonth())+1},${this.#taskDeadLine.getDate()}, Task has priority:- ${this.#taskPriority==true?`Yes`:'No'}, ${this.#taskDone==true? 'Done':'has not Done'} ` );
    }

}

function printAction(){
    console.log(
        `Welcome to JS TODO-APP
      ***************************
      Select an action:
      1) Add a new task
      2) List all tasks
      3) List completed tasks
      4) Mark the task as done
      5) Delete a task
      6) Sort tasks by the due date
      7) Sort tasks by priority
      8) Clear all tasks
      0) Exist
      `);
  }

  let tasks=new Array();

  function addNewTask(){
    let taskName=prompt(`What is the name of the task:- `);
    let sameName=tasks.some(task=>{
        return task.taskNameValue==taskName
       });
        while(sameName){
            taskName=prompt('you has task with this name,please enter another name:- ');
             sameName=tasks.some(task=>{
                return task.taskNameValue==taskName
                 });
        }

    let deadLine=prompt(`The final time to complete the task, Enter like this(yyyy,mm,dd):- `);
    let priority=prompt(`Mark this task, Enter like this(yes/no):- `);
     deadLine=new Date(deadLine);
     let task=new Task(taskName,deadLine,priority);
     tasks.push(task);
}

function listAllTask(){
    if(tasks.length==0)
    {
        console.log('You have no tasks yet');
        return;
    }     
          let i=1;
    for(let task of tasks){
        
        console.log(`${i}- ${task.printTask()}`);
        i++;
    }
   }
 

 function ListCompleteTasks(){
    let test = tasks.some(task=>{
        return task.taskDoneValue==true
       });
       if(test){
        tasks.filter(task=>{
            let i=0;
            if(task.taskDoneValue==true){
                i++;
               console.log(`${i}- ${task.printTask()}`);}
           });

      
       }
       else {
       if(tasks.length==0)
       console.log(`You don't have any tasks`);
       else
       console.log(`oops,You haven't finished any task yet!!`);
       }
  

    }

    function markTaskAsDone()
    {
       
        let test = tasks.some(task=>{
            return task.taskDoneValue==false
           });
           if(test){
            tasks.filter(task=>{
                let i=0;
                if(task.taskDoneValue==false){
                    i++;
                   console.log(`${i}- ${task.printTask()}`);}
               });

               let taskName=prompt("Enter the name of task want to make it as done:- ");
               tasks.filter(task=>{
                   if(task.taskNameValue==taskName)
                   task.taskDoneValue=true;
               });
           }
           else {
           if(tasks.length==0)
           console.log(`You don't have any tasks`);
           else
           console.log(`Excellent, you have completed all tasks`);
           }
      
        
      
        
    }
    function deleteTask(){
        if(tasks.length==0){
            console.log(`You don't have any tasks`);
            return;
        }
        listAllTask();
        let taskName = prompt('please enter task name to delete it:- ');
        let noName=tasks.some(task=>{
            return task.taskNameValue==taskName
           });
           while(!noName){
            taskName=prompt('you don\'t has task has name,please enter correct name:-');
             noName=tasks.some(task=>{
                return task.taskNameValue==taskName
                 });
                 
        }
        let indexOfTask ;
        for (let i = 0; i < tasks.length; i++) {
            if(tasks[i].taskNameValue==taskName)
          {  indexOfTask=i;
            break;}
            
        }
         console.log(indexOfTask);
         tasks.splice(indexOfTask,1);
        
}

function sortTaskDueDate(){
    if(tasks.length==0){
        console.log(`You don't have any tasks`);
        return;
    }
    function compare(a,b){
     let date1=a.taskDeadLineValue;
     let date2=b.taskDeadLineValue;
     if(date1<date2)
     return -1;
     if(date1>date2)
     return 1;
     return 0;
    }
    tasks.sort(compare);
   }

   function sortTaskDuePriority(){
    if(tasks.length==0){
        console.log(`You don't have any tasks`);
        return;
    }
    let tasksMarked=tasks.filter(task=>{
        if(task.taskPriorityValue==true)
        return task;
    });
    let tasksNotMarked=tasks.filter(task=>{
        if(task.taskPriorityValue==false)
        return task;
    })

    function compare(a,b){
        let date1=a.taskDeadLineValue;
        let date2=b.taskDeadLineValue;
        if(date1<date2)
        return -1;
        if(date1>date2)
        return 1;
        return 0;
       }

       tasksMarked.sort(compare);
       tasksNotMarked.sort(compare);
       tasks.length=0;
       tasksMarked.forEach(task=>{
        tasks.push(task);
       });
       tasksNotMarked.forEach(task=>{
        tasks.push(task);
       })
    

   }

   function clearAllTask()
   {
    if(tasks.length==0){
        console.log(`You don't have any tasks to delete it`);
        return;
    }
    tasks.length=0;
    console.log(`you delete all task`);
   }

printAction();
var s=prompt('please enter your choise:- ');
console.log(s);
while(s!=0){
 
    if(s==1){
        addNewTask();
    }
    else if(s==2){
        listAllTask();
    }
    else if(s==3){
        ListCompleteTasks();
    }
    else if(s==4){
        markTaskAsDone();
    }
    else if(s==5){
        deleteTask();
    }
    else if(s==6){
        sortTaskDueDate();
    }
    else if(s==7){
        sortTaskDuePriority();
    }
    else if (s==8){
        clearAllTask();
    }
    else{
        console.log('choise between 0-8');
    }
    s=prompt('choose your next action:- ');
    if(s==0)
    {
        console.log('good bye');
    }

}
   
                


