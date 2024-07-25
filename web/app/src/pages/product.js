import Template from "../components/Template";

function Product() {
    return (
        <>
            <Template>
                <div className="card" style={{ width: 180 }}>
                    <img src="placeholder.jpg" className="card-img-top" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </Template>
        </>
    );
}

export default Product;


<img src="dist/img/logo-top.png" 