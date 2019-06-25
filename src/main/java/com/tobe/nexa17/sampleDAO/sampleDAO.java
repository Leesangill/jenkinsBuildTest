package com.tobe.nexa17.sampleDAO;
import java.util.List;

import com.tobe.nexa17.sampleVO.sampleVO;

public interface sampleDAO {
	public List<sampleVO> searchData(List<sampleVO> dsList) throws Exception; 
	public int insertData(sampleVO sampleData) throws Exception;
	public void modifyData(sampleVO sampleData) throws Exception;
	public void deleteData(sampleVO sampleData) throws Exception;
}
