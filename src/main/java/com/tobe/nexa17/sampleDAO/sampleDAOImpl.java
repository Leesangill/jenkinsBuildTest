package com.tobe.nexa17.sampleDAO;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tobe.nexa17.sampleVO.sampleVO;

@Repository
public class sampleDAOImpl implements sampleDAO{
	
	final private String nameSpace = "SampleMapper.";
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<sampleVO> searchData(List<sampleVO> dsList) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.selectList(nameSpace + "searchData", dsList);
	}
	
	@Override
	public int insertData(sampleVO sampleData) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("sql 실행 전 데이터 ::" + sampleData.getCUST_ID());
		return sqlSession.insert(nameSpace + "insertData", sampleData);
	}
	
	@Override
	public void modifyData(sampleVO sampleData) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.update(nameSpace + "updateData", sampleData);
		
	}
	
	@Override
	public void deleteData(sampleVO sampleData) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.delete(nameSpace + "deleteData", sampleData);
	}
}
