import React from 'react';
import SiteHeader from 'components/SiteHeader';


class InternalLayout extends React.Component {
    render() {
        return (
            <div class="poss">
                <SiteHeader/>
                <section class="main">
                    <div class="section_content full_width">
                        {this.props.children}
                    </div>
                </section>
            </div>

        );
    }
}

export default InternalLayout;