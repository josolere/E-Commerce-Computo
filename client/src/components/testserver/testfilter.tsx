import React, { Fragment, useState } from 'react'

const Filterr = (): JSX.Element => {

    const [sugerencias, setSugerencias] = useState([])
    const [activarsugerenias, setActivarsugerencias] = useState(0)
    const [mostrar, setMostrar] = useState(false)
    const [userinput, setUserinput] = useState("")
    const [showeste, setShoweste] = useState("")
    const [filtrada, setFiltrada] = useState([""])

    const sugerenciastest = ["white", "black", "green", "blue", "yellow", "red"]

    let sugerenciasfiltradas:Array<string> =[""]

    let sugerenciafinal:string

    sugerenciafinal= "test"

    const filtrar = (e:React.FormEvent<HTMLInputElement>) => {
        setUserinput((e.currentTarget.value).toLocaleLowerCase())
        setFiltrada(sugerenciastest.filter(
            (sugerenciastest) =>
              sugerenciastest.toLowerCase().indexOf(userinput.toLowerCase()) > -1))
        sugerenciafinal= sugerenciasfiltradas.toString()
        setShoweste(filtrada.toString())
}

console.log(filtrada)
console.log(userinput)
    return (
        <Fragment>
            <input type='text' value={userinput} onChange={filtrar} placeholder="Test auto" />
            <div>
                {showeste}
            </div>
        </Fragment>
    )
}

export default Filterr