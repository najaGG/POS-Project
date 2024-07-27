import Template from "../components/Template";

function Editproduct() {
    return (
        <>
            <Template>
                <p className="text-start">แก้ไข / เพิ่มเติมสินค้า</p>

                <div className="row">
                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3 ">
                            <span className="input-group-text" id="inputGroup-sizing-lg">เลือกรูปภาพ</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                            <label htmlFor="inputPassword2"></label>
                        </div>
                    </div>                        
                    
                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-lg">เลือกรูปภาพ</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                            <label htmlFor="inputPassword2"></label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-lg">เลือกรูปภาพ</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                            <label htmlFor="inputPassword2"></label>
                        </div>
                    </div>
                </div>

                <form className="row g-3">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
                    </div>
                </form>
            </Template>
        </>
    );
}

export default Editproduct;



