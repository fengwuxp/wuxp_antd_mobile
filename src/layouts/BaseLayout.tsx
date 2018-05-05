import * as React from "react";
import DocumentTitle from 'react-document-title';
import {renderRoutes} from "react-router-config";
import routers from "../views";


export default class BaseLayout extends React.Component<any, any> {


    render() {

        return <DocumentTitle title={this.getPageTitle()}>
            {renderRoutes(routers)}
        </DocumentTitle>
    }


    getPageTitle = (): string => {

        return "";
    }
}
