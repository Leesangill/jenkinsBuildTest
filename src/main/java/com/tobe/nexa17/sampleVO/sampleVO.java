package com.tobe.nexa17.sampleVO;
import java.util.Date;

import com.nexacro.uiadapter17.spring.core.data.DataSetRowTypeAccessor;

import lombok.Data;
@Data
public class sampleVO implements DataSetRowTypeAccessor {
   	private String CUST_ID;
    private String CUST_NM;
    private String CUST_BIZ_NO;
    private String CUST_GRADE;
    private String CUST_DEPT;
    private String CUST_EMP_NM;
    private String CUST_TEL;
    private String CUST_TYPE;
    private int CUST_AMT;
    private String USE_YN;
    private Date REG_DATE;
    private int rowType;
}
