import React from 'react';
const PublicLayout = ({ children }) => {
    return (
        <div className="public-layout" style={{ margin: '20px' }}>
            <header><h1>Header Public</h1></header>
            <main>{children}</main>
        </div>
    );
};
export default PublicLayout;