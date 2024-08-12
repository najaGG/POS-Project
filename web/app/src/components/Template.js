import Navbar from "./Navbar";
import SidebarMember from "./SidebarMember";

function Template (props){
    return(
        <>
            <div class="wrapper">
                <Navbar/>
                <SidebarMember/>

                <div class="content-wrapper pt-2">
                    <section class="content">
                        {props.children}
                    </section>
                </div>
            </div>
        </>
    )
}
export default Template;