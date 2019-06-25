package com.tobe.nexa17.sampleService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nexacro.uiadapter17.spring.core.data.DataSetRowTypeAccessor;
import com.nexacro17.xapi.data.DataSet;
import com.tobe.nexa17.sampleDAO.sampleDAOImpl;
import com.tobe.nexa17.sampleVO.sampleVO;

@Service
public class sampleServiceImpl implements sampleService{

	@Autowired
	sampleDAOImpl sampleDAOimpl;
	
	@Override
	public List<sampleVO> searchData(List<sampleVO> dsList) throws Exception {
		// TODO Auto-generated method stub
		return sampleDAOimpl.searchData(dsList);
	}
	
	@Override
	public void saveData(List<sampleVO> InputDs) throws Exception {
		int dsSize = InputDs.size();
		System.out.println("size ::: " + dsSize);
	
		for(int i = 0; i<dsSize; i++){
			sampleVO sampleData = InputDs.get(i);
			System.out.println("sampleData ::: " + sampleData.getCUST_ID());
			System.out.println(sampleData instanceof DataSetRowTypeAccessor);
			//DataSetRowTypeAccessor DsAccessor = (DataSetRowTypeAccessor) sampleData;
			if(sampleData instanceof DataSetRowTypeAccessor){
			DataSetRowTypeAccessor DsAccessor = (DataSetRowTypeAccessor) sampleData;
				if(DsAccessor.getRowType() == DataSet.ROW_TYPE_INSERTED) {
					System.out.println("insert :: " + DsAccessor.getRowType());
					sampleDAOimpl.insertData(sampleData);
				}else if(DsAccessor.getRowType() == DataSet.ROW_TYPE_UPDATED) {
					sampleDAOimpl.modifyData(sampleData);
				}else if(DsAccessor.getRowType() == DataSet.ROW_TYPE_DELETED) {
					sampleDAOimpl.deleteData(sampleData);
				}
			}
		}
	}
}
