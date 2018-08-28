  import React  from 'react';
  import '../../Styles/Projects.css';

  export default class EmployeeType_SideBar extends React.Component {
      constructor(props){
          super(props);
          this.displaySpecificEmployeeType = this.displaySpecificEmployeeType.bind(this);
      }
      displaySpecificEmployeeType(event){
        this.props.specificEmployeeType(event.target.name);
      }
      render() {
          return (
              <div className="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Example Pages">
                  <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseEmploymentType" data-parent="#exampleAccordion">
                      <i className="fa fa-fw fa-2x fa-male m-2"></i>

                      <span className="nav-link-text projectsMainHeading">Employee Type</span>
                  </a>
                  <ul className="sidenav-second-level collapse" id="collapseEmploymentType">
                      <li><input type="button" className=" searchEmpButton" name= "fte" value="FTE"  onClick={this.displaySpecificEmployeeType} /> </li>
                      <li><input type="button" className="searchEmpButton" name= "contractor" value="CONTRACTOR"  onClick={this.displaySpecificEmployeeType} />  </li>
                      <li><input type="button" className="searchEmpButton" name= "both" value="BOTH"  onClick={this.displaySpecificEmployeeType} />  </li>
                  </ul>
              </div>


          );
      }
  }

