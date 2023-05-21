package com.controller.Dao;
import com.controller.Domain.Course;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface CourseMapper {
     //新增课程
     int addCourse(Course course);
     //删除课程
     int deleteCourse(int id);
     //更新课程
     int updateCourse(Course course);
     //查询课程
     Course findCourse (int id);
     //展示全部课程
     List<Course> findAll();

}


