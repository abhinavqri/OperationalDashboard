
export const AppInitialState = {
    requiredInformation:{
      isSearchEmployeeRequested:false,
      isQTotalRequested: true,
       projectDetails:{
             isRequested:true,
             projects:{
               all:true,
               isAlphaDetailsRequested:false,
               isPemexusWorkDetailsRequested:false,
               isPemexMexicoWorkDetailsRequested:false,
               isLadardDetailsRequested:false,
               isHalfayaDetailsRequested:false,
               isPlusPetrolNorthDetailsRequested:false,
               isEcoNorthDetailsRequested:false,
             }
       },
       departmentDetails:{
             isRequested:false,
             departments:{
               all:false,
               isCorporateDetailsRequested:false,
               isPopsDetailsRequested:false,
               isITDetailsRequested:false,
               isTechnologyDetailsRequested:false,
               isFinanceDetailsRequested:false,
               isBusinessDevDetailsRequested:false,
               isQTechDetailsRequested:false
             }
       },
       QTechDetails:{
             isRequested:false,
             qtech:{
               all:false,
               isQTAutomationDetailsRequested:false,
               isQTDetailsRequested:false,
               isQTInnovationDetailsRequested:false,
               isQTExecutionDetailsRequested:false,
               isQTDevelopmentDetailsRequested:false,
             }
       },
       employeeTypeDetails:{
            isRequested:false,
            employeeTypes:{
              isFTETypeRequested:false,
              isContTypeRequested:false,
              isBothTypeRequested:false
            } 
       }
    }
}

export const AppInitialStateWithDefaultValues = {
    requiredInformation:{
      isSearchEmployeeRequested:false,
      isQTotalRequested: true,
       projectDetails:{
             isRequested:false,
             projects:{
               all:false,
               isAlphaDetailsRequested:false,
               isPemexusWorkDetailsRequested:false,
               isPemexMexicoWorkDetailsRequested:false,
               isLadardDetailsRequested:false,
               isHalfayaDetailsRequested:false,
               isPlusPetrolNorthDetailsRequested:false,
               isEcoNorthDetailsRequested:false,
             }
       },
       departmentDetails:{
             isRequested:false,
             departments:{
               all:false,
               isCorporateDetailsRequested:false,
               isPopsDetailsRequested:false,
               isITDetailsRequested:false,
               isTechnologyDetailsRequested:false,
               isFinanceDetailsRequested:false,
               isPlusPetrolNorthDetailsRequested:false,
               isBusinessDevDetailsRequested:false,
               isQTechDetailsRequested:false,
             }
       },
       QTechDetails:{
             isRequested:false,
             qtech:{
               all:false,
               isQTAutomationDetailsRequested:false,
               isQTDetailsRequested:false,
               isQTInnovationDetailsRequested:false,
               isQTExecutionDetailsRequested:false,
               isQTDevelopmentDetailsRequested:false,
             }
       },
       employeeTypeDetails:{
            isRequested:false,
            employeeTypes:{
              isFTETypeRequested:false,
              isContTypeRequested:false,
              isBothTypeRequested:false
            } 
       }
    }
}

export const initialPeriodData = {

    quarterlyInfo:{
        isQuarterOneChecked : false,
        isQuarterTwoChecked : false,
        isQuarterThreeChecked : false,
        isQuarterFourChecked : false
    },
    monthlyInfo:{
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
    },
    weeklyInfo:{
        isWeekOneChecked:false,
        isWeekTwoChecked:false,
        isWeekThreeChecked:false,
        isWeekFourChecked:false,
        isWeekFiveChecked:false
    }


}
