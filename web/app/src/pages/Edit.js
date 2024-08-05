import Template from "../components/TemplateAdmin";

function EditProduct() {
    return (
        <>
            <Template>
                <div className="row">
                    <label htmlFor="productName" className="form-label">เพิ่มเติมสินค้า</label>
                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="productName">ชื่อสินค้า</span>
                            <input type="text" className="form-control" id="productName" aria-label="Sizing example input" aria-describedby="productName" />
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="quantity">จำนวน</span>
                            <input type="text" className="form-control" id="quantity" aria-label="Sizing example input" aria-describedby="quantity" />
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="usage">การใช้งานสินค้า</span>
                            <input type="text" className="form-control" id="usage" aria-label="Sizing example input" aria-describedby="usage" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="productImage" className="form-label">เลือกภาพสินค้า</label>
                        <input className="form-control form-control-lg" id="productImage" type="file" />
                    </div>

                </div>

                <div className="mt-2 text-center">
                    <button type="submit" className="btn btn-primary mb-3">บันทึก</button>
                </div>

            </Template>
        </>
    );
}

export default EditProduct;

