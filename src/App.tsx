import { ChangeEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { Task } from './Task'
import { formatDate } from 'date-fns'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import styles from './App.module.css'
import logo from './assets/Logo.svg'
import clipboard from './assets/Clipboard.svg'
import 'react-toastify/dist/ReactToastify.css';

interface tasksType {id: string; text: string;}

export function App() {

  const [tasks,setTasks] = useState<tasksType[]>([])

  const [taskText, setTaskText] = useState<string>('')
  const [countCreatedTasks, setCountCreatedTasks] = useState<number>(tasks.length)
  const [countCompletedTasks, setCountCompletedTasks] = useState<number>(0)

  function handleTextChange(event: ChangeEvent<HTMLInputElement>){
    setTaskText(event.currentTarget.value)
  }

  function handleCreateTask(){
    if(taskText != ''){
      const tasksArray = [...tasks, {
        id: formatDate(new Date(), "ddMMMuuuu':'HHmmssSS"),
        text: taskText
      }]    
      setTasks(tasksArray)
      setCountCreatedTasks(tasksArray.length)
      setTaskText('')
    } 
    else {
      toast.warn(
        'É necessário preencher a descrição da tarefa.', {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
        }
      )
    }
  }

  function deleteTasks(taskId: string) {
    const tasksArray = tasks.filter(task => taskId != task.id)    
    setTasks(tasksArray)
    setCountCreatedTasks(tasksArray.length)
  }

  function completedTasks(value: number){
    const checkedCount = countCompletedTasks + value
    setCountCompletedTasks(checkedCount)
  }

  return (
    <>
      <ToastContainer />
      <header className={styles.header}>
        <img src={logo} alt="logo" />
      </header>
      <main className={styles.main}>
        <div className={styles.inputAndButton}>
          <input onChange={handleTextChange} value={taskText} required className={styles.input} type="text" placeholder='Adicione uma nova tarefa'/>
          <button onClick={handleCreateTask} className={styles.createButton}>
            Criar
            <PlusCircle size={16} />
          </button>
        </div>
        <section className={styles.listSection}>
          <header className={styles.sectionHeader}>
            <div className={styles.createdTasks}>
              <b>Tarefas criadas</b>
              <div>
                {countCreatedTasks}
              </div>
            </div>
            <div className={styles.completedTasks}>
              <b>Concluídas</b>
              <div>
                {tasks.length == 0 && `${countCompletedTasks}`}
                {tasks.length > 0 && `${countCompletedTasks} de ${countCreatedTasks}`}                
              </div>
            </div>
          </header>
          <main className={styles.sectionMain}>
            {tasks.length == 0 && 
              <div className={styles.noTasksDiv}>
                <img src={clipboard} alt="clipboard" />
                <div>
                  <p className={styles.boldText}>Você ainda não tem tarefas cadastradas</p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              </div>
            }
            {tasks.length > 0 && 
            <div className={styles.taskList}>
              {tasks.map(task => (
                <div key={task.id} >
                  <Task 
                    text={task.text} 
                    id={task.id}
                    deleteTasks={deleteTasks}
                    completedTasks={completedTasks}
                  />
                </div>
              ))}
            </div>}
          </main>
        </section>
      </main>
    </>
  )
}
