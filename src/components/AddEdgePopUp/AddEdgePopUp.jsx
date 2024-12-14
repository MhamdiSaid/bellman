import "./AddEdgePopUp.css";

export default function AddEdgePopUp(){


    return(
        <>
        <div className="add-edge">
            <div>
                <p>Destination:</p>
            <select className="destination-vertex">
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
            </select>
            </div>
            <div>
                <p>Weight: </p>
            <input type="text" placeholder="weight"/>
            </div>

        </div>
        </>
    )
}