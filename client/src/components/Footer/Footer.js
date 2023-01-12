import React from 'react'

const Footer = () => {
  return (
    <div className="d-flex flex-column">
    <div id="page-content" style={{backgroundColor: "#1a1c27"}}>
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-md-7">
                <h1 className="fw-light mt-4 text-white">Sticky Footer using Flexbox</h1>
                <p className="lead text-white-50">Use just two Bootstrap utility classes and three custom CSS rules and you will have a flexbox enabled sticky footer for your website!</p>
                </div>
            </div>
        </div>
    </div>
    <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50">
        <div className="container text-center">
        <small>Copyright &copy; Your Website</small>
        </div>
    </footer>
    </div>
  )
}

export default Footer
