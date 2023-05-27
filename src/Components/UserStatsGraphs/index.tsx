import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { VictoryPie, VictoryChart, VictoryBar } from 'victory'

type Stats = {
    id:number;
    title:string;
    acessos:string;
}
type Props = {
    data: Stats[]
}
const UserStatsGraphs = ({data}:Props) => {
  const [graph,setGraph] = useState<{x:string, y:number}[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setGraph(data.map(item => {return {x:item.title,y:Number(item.acessos)} }))
    setTotal(data.map((item) => Number(item.acessos)).reduce((a,b) => a+b,0));
  },[data])  

  return (
    <section className={`animeLeft ${styles.graph}`}>
        <div className={`${styles.total} ${styles.graphItem}`}>
            <p>
                Acessos:{total}
            </p>
        </div>
        <div className={`${styles.graphItem}`}>
            <VictoryPie data={graph} style={{
                border: {
                    stroke:'#fff',
                    strokeWidth:2,
                    fillOpacity:0.9
                    
                },
                labels:{
                    fontSize:14,
                    fill:'#333'
                }
            }} innerRadius={50} padding={{top:20, bottom:20, left:80,right:80}}/>
        </div>
        <div className={`${styles.graphItem}`}>
            <VictoryChart>
                <VictoryBar data={graph} alignment='start'/>
            </VictoryChart>
        </div>
    </section>
  )
}

export default UserStatsGraphs