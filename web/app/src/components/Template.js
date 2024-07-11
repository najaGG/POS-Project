import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Template (props){
    return(
        <>
            <div class="wrapper">
                <Navbar/>
                <Sidebar/>

                <div class="content-wrapper pt-3">
                    <section class="content">
                        {props.children}
                    </section>
                </div>
            </div>
        </>
    )
}
export default Template;