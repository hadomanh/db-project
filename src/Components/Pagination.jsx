import React, { Component } from 'react';

class Pagination extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    {/* Pagination */}
                    <nav aria-label="navigation">
                        <ul className="pagination justify-content-end mt-50">
                            <li className="page-item active"><a className="page-link" href="#">01.</a></li>
                            <li className="page-item"><a className="page-link" href="#">02.</a></li>
                            <li className="page-item"><a className="page-link" href="#">03.</a></li>
                            <li className="page-item"><a className="page-link" href="#">04.</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Pagination;