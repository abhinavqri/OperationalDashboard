export const projectsList = [
    "ALPHA",
    "PEMEX US Work",
    "PEMEX MEXICO Work",
    "LAZARD",
    "HALFAYA",
    "PLUSPETROL - NORTH",
    "ECOPETROL",
    "KOC-NK-CP"
]
export const departmentList = [
    "CORPORATE",
    "PEOPLE OPERATIONS",
    "IT",
    "TECHNOLOGY",
    "FINANCE",
    "SME",
    "BUSINESS DEVELOPMENT",
    "Q TECH"
]

export const projectsWithDummyData = {
    "ALPHA" : [],
    "PEMEX US Work" : [],
    "PEMEX MEXICO Work" : [],
    "LAZARD" : [],
    "HALFAYA" : [],
    "PLUSPETROL - NORTH" : [],
    "ECOPETROL - Work-Order # 1" : [],
    "KOC-NK-CP":[]
}
export const allProjectsWithEmployeeCount = ()=> {
    return {
        "ALPHA" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "PEMEX US Work" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "PEMEX MEXICO Work" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "LAZARD" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "HALFAYA" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "PLUSPETROL - NORTH" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "ECOPETROL - Work-Order # 1" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "KOC-NK-CP":[0,0,0,0,0,0,0,0,0,0,0,0]
    }
}
export  const departmentsWithDummyData = {
    "CORPORATE" : [],
    "PEOPLE OPERATIONS" : [],
    "IT" : [],
    "TECHNOLOGY" : [],
    "FINANCE" : [],
    "SME" : [],
    "BUSINESS DEVELOPMENT":[],
    "Q TECH":[]
}

export const allDepartmentsWithEmployeeCount = ()=>{

    return {
        "CORPORATE" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "PEOPLE OPERATIONS" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "IT" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "TECHNOLOGY" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "FINANCE" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "SME" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "BUSINESS DEVELOPMENT" : [0,0,0,0,0,0,0,0,0,0,0,0],
        "Q TECH":[0,0,0,0,0,0,0,0,0,0,0,0]
    }

}
export const getMonthlyDataDefaultValues = () =>{
    return {
        isJanMonthChecked : false,
        isFebMonthChecked : false,
        isMarMonthChecked : false,
        isAprMonthChecked : false,
        isMayMonthChecked : false,
        isJunMonthChecked : false,
        isJulMonthChecked : false,
        isAugMonthChecked : false,
        isSepMonthChecked : false,
        isOctMonthChecked : false,
        isNovMonthChecked : false,
        isDecMonthChecked : false
    }
}
export const getWeeklyDataDefaultValues = () =>{
    return {
        isWeekOneChecked:false,
        isWeekTwoChecked:false,
        isWeekThreeChecked:false,
        isWeekFourChecked:false,
        isWeekFiveChecked:false
    }
}
export const getQuarterlyDataDefaultValues = () =>{
    return {
        isQuarterOneChecked : false,
        isQuarterTwoChecked : false,
        isQuarterThreeChecked : false,
        isQuarterFourChecked : false
    }
}
export const getQuarterlyCheckBoxDisabled = () =>{
    return {
        isQuarterOneDisabled : false,
        isQuarterTwoDisabled : false,
        isQuarterThreeDisabled : false,
        isQuarterFourDisabled : false
    }
}


export const getMonthlyCheckBoxDisabled = () =>{
    return {
        isJanMonDisabled : false,
        isFebMonDisabled : false,
        isMarMonDisabled : false,
        isAprMonDisabled : false,
        isMayMonDisabled : false,
        isJunMonDisabled : false,
        isJulMonDisabled : false,
        isAugMonDisabled : false,
        isSepMonDisabled : false,
        isOctMonDisabled : false,
        isNovMonDisabled : false,
        isDecMonDisabled : false
    }
}

export const  QUARTERMAP ={"Q1":1,"Q2":2,"Q3":3,"Q4":4};
export const  MONTHMAP ={"JAN":1,"FEB":2,"MAR":3,"APR":4,"MAY":5,"JUN":6,"JUL":7,"AUG":8,"SEP":9,"OCT":10,"NOV":11,"DEC":12,};
export const  WEEKMAP ={"WEEK1":1,"WEEK2":2,"WEEK3":3,"WEEK4":4,"WEEK5":5};
export const  DYNAMICMONTHSMAP = { "1": "JAN", "2": "JAN-FEB", "3": "JAN-FEB-MAR", "4": "JAN-FEB-MAR-APR", "5": "JAN-FEB-MAR-APR-MAY",
    "6": "JAN-FEB-MAR-APR-MAY-JUN", "7": "JAN-FEB-MAR-APR-MAY-JUN-JUL", "8": "JAN-FEB-MAR-APR-MAY-JUN-JUL-AUG",  "9": "JAN-FEB-MAR-APR-MAY-JUN-JUL-AUG-SEP",
    "10": "JAN-FEB-MAR-APR-MAY-JUN-JUL-AUG-SEP-OCT", "11": "JAN-FEB-MAR-APR-MAY-JUN-JUL-AUG-SEP-OCT-NOV", "12": "JAN-FEB-MAR-APR-MAY-JUN-JUL-AUG-SEP-OCT-NOV-DEC" };