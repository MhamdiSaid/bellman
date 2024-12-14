import "./Toolbar.css";

export default function Toolbar(){

    return(
        <>
        <div class="dropdown">
        <div  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <div className="node" title="CasaBlanca">
            <p>CasaBlanca</p>
        </div>
        </div>

        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Delete Node</a></li>
            <li><a class="dropdown-item" href="#">Delete Edge</a></li>
            <li><a class="dropdown-item" href="#">Add Edge</a></li>
        </ul>
        </div>
        </>
    )
}