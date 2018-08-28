  import React  from 'react';
  import '../../Styles/Projects.css';

  export default class Projects_SideBar extends React.Component {
      constructor(props){
          super(props);
          this.displaySpecificProjectDetails = this.displaySpecificProjectDetails.bind(this);
      }
      displaySpecificProjectDetails(event){
        this.props.specificProject(event.target.name);
      }
      render() {
          return (
              <div className="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Example Pages">
                  <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion">
                      <i className="fa fa-fw fa-2x fa-dollar  rotate-in-ver m-2"></i>

                      <span className="nav-link-text projectsMainHeading">Billable</span>
                  </a>
                  <ul className="sidenav-second-level collapse out" id="collapseExamplePages">
                      <li><input type="button" className=" searchEmpButton" name= "alpha" value="ALPHA"  onClick={this.displaySpecificProjectDetails} /> </li>
                      <li><input type="button" className="searchEmpButton" name= "pemexuswork" value="PEMEX US WORK"  onClick={this.displaySpecificProjectDetails} />   </li>
                      <li><input type="button" className="searchEmpButton" name= "pemexmexicowork" value="PEMEX MEXICO WORK"  onClick={this.displaySpecificProjectDetails} />  </li>
                      <li><input type="button" className="searchEmpButton" name= "lazard" value="LAZARD"  onClick={this.displaySpecificProjectDetails} />  </li>
                      <li><input type="button" className="searchEmpButton" name= "halfaya" value="HALFAYA"  onClick={this.displaySpecificProjectDetails} />  </li>
                      <li><input type="button" className="searchEmpButton" name= "pluspetrol-north" value="PLUS PETROL NORTH"  onClick={this.displaySpecificProjectDetails} />  </li>
                      <li><input type="button" className="searchEmpButton" name= "ecopetrol" value="ECO PETROL"  onClick={this.displaySpecificProjectDetails} />  </li>
                      <li><input type="button" className="searchEmpButton" name= "koc-nk-cp" value="KOC-NK-CP"  onClick={this.displaySpecificProjectDetails} />  </li>
                      <li> <PilotProject className="searchEmpButton" /> </li>

                  </ul>
              </div>


          );
      }
  }


  class PilotProject extends React.Component{

      render(){

          return (
              <div className="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Example Pages">
                  <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#pilotProjects" data-parent="#exampleAccordion">
                      <span className="nav-link-text">Pilot Projects</span>
                  </a>
                  <ul className="sidenav-second-level collapse" id="pilotProjects">
                      <li><input type="button" className=" searchEmpButton" name= "Project A" value="Project A" /> </li>
                      <li><input type="button" className="searchEmpButton" name= "Project B" value="Project B" />  </li>
                      <li><input type="button" className="searchEmpButton" name= "Project C" value="Project C" />  </li>

                  </ul>
              </div>

          );
      }



  }