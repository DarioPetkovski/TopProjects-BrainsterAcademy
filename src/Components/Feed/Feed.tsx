import Card from "../Card/Card"
import { useGlobalContext } from "../GlobalContext/Context"

function Feed() {
    const {data} = useGlobalContext()
  return (
    <div className="container-fluid px-5 pb-4">
        <div className="row">
            {data.map((item,index) => {
                return <Card key={index} {...item}/>
            })}
   </div>
</div>
  )
}

export default Feed