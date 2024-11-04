import "css/layout.css"
function Layout(props) {
    return (
        <>
            <header></header>
            <div id="layout">
                {props.children}
            </div>
        </>
    )
}

export default Layout