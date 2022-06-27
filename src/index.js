import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './university.svg';


//raw data used for testing
const data = {
  "metadata":{"page":0,"total":6662,"per_page":5},
  "results":
  [{
      "latest.student.size":5090,
      "latest.admissions.admission_rate.overall":0.8965,
      "school.name":"Alabama A & M University",
      "school.school_url":"www.aamu.edu\/",
      "school.city":"Normal",
      "school.state":"AL",
      "id":100654,
      "latest.programs.cip_4_digit":
      [{"title":"Agriculture, General.","credential":{"level":3}},
      {"title":"Animal Sciences.","credential":{"level":3}},
      {"title":"Food Science and Technology.","credential":{"level":3}}]
  }]};



//returns the school name from the props.
//props should be data.results.(index)
function schoolName(props){
  return(
    <p style={{fontWeight: 'bold'}}>{props['school.name']}</p>
  );
}

//returns the school location in "city + " ," + state" format
//props should be data.results.(index)
function schoolLocation(props){
  return(
    <p style={{fontSize: '90%'}}>
      {props['school.city']}, {props['school.state']}
    </p>
  )
}

//returns the number of latest student count
//props should be data.results.(index)
function studentSize(props){
  return(
    <p style={{fontSize: '90%', marginTop:0, height: '100%'}}>
      Student size:<br></br>
      <span style={{fontWeight: 'bold', color: "#868fd1"}}>{props['latest.student.size']}</span>
    </p>
  )
}


//returns the admission rate as percentage and returns a corresponding progressBar component
//props should be data.results.(index) 
function admissionRate(props){
  const rate = Math.round(props['latest.admissions.admission_rate.overall'] * 100);
  return(
      <>
        <p style={{fontSize: '90%', height: '100%'}}>
          Admission rate:<br></br>
          <span style={{fontWeight: 'bold', color: "#868fd1"}}>{rate}%</span> {progressBar({barRate:rate})}
        </p>
      </>
  )
}

//returns a progress bar that is filled using props.rate as the percentage filled.
//props should have an element 'rate' that is 0<100
function progressBar(props){
  const progress = props.barRate;
  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#add8e6',
    borderRadius: '5%',
    textAlign: 'right'
  }
  return(
    <div className='Parentdiv'>
      <div style={Childdiv}>
      </div>
    </div>
  )
}



//returns a table with the basic information about the school
//uses the components: schoolName, schoolLocation, studentSize, admissionRate
//props should be data.results.(index)
function basicInfoTable(props){
  return(
    <table className='basicInfoTable'>
      <tbody>
        <tr>
          <td colSpan={2}>{schoolName(props)}</td>
        </tr>
        <tr>
          <td colSpan={2}>{schoolLocation(props)}</td>
        </tr>
        <tr>
          <td>{studentSize(props)}</td>
          <td>{admissionRate(props)}</td>
        </tr>
      </tbody>
    </table>
  )
}


//returns the whole schoolCard which includes: logo, basicInfoTable, listOfPrograms
//props should be data.results.(index)
function schoolCard(props){
  return(
    <div className='schoolCard'>
      <table>
        <tbody>
          <tr>
            <td className='logoCell'><img src={logo} className="App-logo" alt="logo" /></td>
            <td className='infoCell'>{basicInfoTable(props)}<br id='dividingLine'></br></td>
          </tr>
        </tbody>
      </table>
      <hr></hr>
      {listOfDegrees(props['latest.programs.cip_4_digit'])}
    </div>
  )
}


//Counts the programs with their given credential levels
//returns the list of credentials and their counted values.
//props should be data.results.(index)['latest.programs.cip_4_digit']
function listOfDegrees(props){
  const listOfPrograms = props;
  var credentials = {
    level1:0,
    level2:0,
    level3:0,
    level4:0,
    level5:0,
    level6:0,
    level7:0,
    level8:0
  }

  for(let i=0; i<listOfPrograms.length; i++){
    if (listOfPrograms[i]['credential'].level === 1)
    {credentials.level1 +=1;} 
    else if (listOfPrograms[i]['credential'].level === 2)
    {credentials.level2 +=1;}
    else if (listOfPrograms[i]['credential'].level === 3)
    {credentials.level3 +=1;}
    else if (listOfPrograms[i]['credential'].level === 4)
    {credentials.level4 +=1;}
    else if (listOfPrograms[i]['credential'].level === 5)
    {credentials.level5 +=1;}
    else if (listOfPrograms[i]['credential'].level === 6)
    {credentials.level6 +=1;}
    else if (listOfPrograms[i]['credential'].level === 7)
    {credentials.level7 +=1;}
    else if (listOfPrograms[i]['credential'].level === 8)
    {credentials.level8 +=1;}
  }
  return(
    <table>
      <tbody>
        <tr><td>Undergraduate Certificate or Diploma: {credentials.level1}</td></tr>
        <tr><td>Associate's Degree: {credentials.level2}</td></tr>
        <tr><td>Post-baccalaureate Certificate: {credentials.level3}</td></tr>
        <tr><td>Bachelor’s Degree: {credentials.level4}</td></tr>
        <tr><td>Master's Degree: {credentials.level5}</td></tr>
        <tr><td>Doctoral Degree: {credentials.level6}</td></tr>
        <tr><td>First Professional Degree: {credentials.level7}</td></tr>
        <tr><td>Graduate/Professional Certificate: {credentials.level8}</td></tr>
      </tbody>
    </table>
  )
}


//returns a whole table of schoolCards
//props should be data.results (an array of schools)
function bigTable(props){
  return(
    <table>
      <tr>
        <td>{schoolCard(props)}</td>
        <td>{schoolCard(props)}</td>
        <td>{schoolCard(props)}</td>
      </tr>
      <tr>
        <td>{schoolCard(props)}</td>
        <td>{schoolCard(props)}</td>
        <td>{schoolCard(props)}</td>
      </tr>
    </table>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // schoolName(data.results[0])
  // schoolLocation(data.results[0])
  // studentSize(data.results[0])
  // progressBar({rate:87})
  // admissionRate((data.results[0]))
  // basicInfoTable((data.results[0]))
  // schoolCard((data.results[0]))
  // listOfDegrees(data.results[0]['latest.programs.cip_4_digit'])
  bigTable(data.results[0])
);