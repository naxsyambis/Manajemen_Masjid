import React from 'react';
const PublicLayout = ({ children }) => {
    return (
        <div className="Public-layout" style={{ margin: '20px' }}>
            <header><h1>Header public</h1></header>
            <main>{children}</main>
        </div>
    );
};
export default PublicLayout;