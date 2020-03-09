import React, {useContext, useState, useEffect} from 'react'
import AppContext from '../../appContext'
import data from './data'
import Grid from '../../base/grid/Grid'

const MissionsGrid = (props) => {
    const {addressToGeocode, distanceBetween} = useContext(AppContext)
    const address = '10 Downing st. London'
    const [gridData, setGridData] = useState([])
    const [ rowStyle, setRowStyle] = useState({})

    useEffect(()=>{
        let closest, farthest, closestRowNum=0, farthestRowNum=0;
        addressToGeocode(address).then(to=>{
            const getData = async () => {
                return await Promise.all(data.map((obj, i)=> {
                    
                    return addressToGeocode(obj.address).then(from=>{
                        return distanceBetween(from, to).then(distance=>{
                            let tempClosest = closest, tempFarthest = farthest;
                            closest = closest?(distance<closest?distance:closest) : distance;
                            farthest = farthest?(distance>farthest?distance:farthest) : distance;
                            
                            if (closest !== tempClosest) {
                                closestRowNum = i 
                            }
                            if(farthest !== tempFarthest){
                                farthestRowNum = i
                            }

                            return obj
                        }).catch(err=>console.error(err))
                    })
                }))
            }
            getData().then(data=>{
                const sortedByDate = data.sort((a,b)=>{
                    const d1 = new Date(a.date).getTime
                    const d2 = new Date(b.date).getTime
                    return (d1 > d2)? 1 : ((d1 < d2)? -1: 0)    
                })

                setRowStyle({
                    [farthestRowNum]: 'red',
                    [closestRowNum]: 'green'
                })
                setGridData(sortedByDate)
            })
        })
        
        const normalized = data.reduce((acc, next) => {
            if (acc.agents[next.agent]) {
                acc.agents[next.agent].push(next.country)
            } else {
                acc.agents[next.agent] = [next.country]
            }
            
            if (acc.countries[next.country]) {
                acc.countries[next.country].agentIdies.push(next.agent)
            } else {
                acc.countries[next.country] = { agentIdies: [next.agent], isolationDegree: 0 }
            }
            
            return acc
        }, { agents: {}, countries: {} })
        
        const mostIsolatedCountry = {
            isolationDegree:0,
            countryName:''
        }
        const countries = Object.entries(normalized.countries).map(([country, obj]) => {
            let isolationDegree = 0
            for (var id of obj.agentIdies) {
                if (normalized.agents[id].length === 1) {
                    isolationDegree++
                }
            }
            if(isolationDegree > mostIsolatedCountry.isolationDegree){
                mostIsolatedCountry.isolationDegree = isolationDegree
                mostIsolatedCountry.countryName = country
            }
            const newObj = { ...obj, isolationDegree }
            return [country, newObj]
        })
        
        alert(`${mostIsolatedCountry.countryName} is the most isolated with isolation degree of ${mostIsolatedCountry.isolationDegree}`)
        console.log("countries with Isolation degree", countries)
        
    },[addressToGeocode,distanceBetween])
        const headerData = ['Agent ID', 'Country', 'Address', 'Date']
        return <Grid rowStyle={rowStyle} data={gridData} headerData={headerData} footerData={`${gridData.length} missions`} />
    }

export default MissionsGrid