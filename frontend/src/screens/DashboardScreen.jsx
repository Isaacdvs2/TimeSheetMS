// import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const DashboardScreen = () => {
  const [timesheets, setTimesheets] = useState(null);

  useEffect(() => {
    const fetchTimesheets = async () => {
      const response = await fetch(
        "http://localhost:8001/api/employee/timesheet"
      );
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setTimesheets(data);
      }
    };

    fetchTimesheets();
  }, [setTimesheets]);

  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow py-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>NDT Timesheet System</Navbar.Brand>
          </LinkContainer>{" "}
          <button
            className="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <LinkContainer to="/">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Out
                </Nav.Link>
              </LinkContainer>
            </div>
          </div>
        </Container>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/employees"}>
                    Manage Employees
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/department"}>
                    Manage Departments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/projects"}>
                    Manage Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/timeperiods"}>
                    Manage Time Periods
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Hello Admin!</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Export
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                >
                  This week
                </button>
              </div>
            </div>

            <h1>
              {timesheets &&
                timesheets.map((timesheet) => (
                  <ul key={timesheet.TimesheetID}>
                    <li>{timesheet.fullName}</li>
                    <li>{timesheet.startTime}</li>
                    <li>{timesheet.endTime}</li>
                    <li>{timesheet.hoursWorked}</li>
                  </ul>
                ))}
            </h1>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
