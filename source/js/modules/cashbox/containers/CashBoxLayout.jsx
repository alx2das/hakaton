import React from 'react';
import SiteHeader from 'components/SiteHeader';

export  default ({children}) => (
    <div class="poss">
        <SiteHeader/>
        <section class="main">
            <div class="section_content section_content__gk">
                <div class="title_panel">
                    <h1>Вид кассы</h1>
                </div>
                {children}</div>
        </section>
    </div>
);
