package com.controller.Service;
import com.controller.Dao.CourseMapper;
import com.controller.Domain.Course;
import java.util.List;
public class CourseServiceImpl implements CourseService{

    private CourseMapper courseMapper;

    public void setCourseMapper(CourseMapper courseMapper) {
        this.courseMapper = courseMapper;
    }

    @Override
    public int addCourse(Course course) {
        return courseMapper.addCourse(course);
    }

    @Override
    public int deleteCourse(int id) {
        return courseMapper.deleteCourse(id);
    }

    @Override
    public int updateCourse(Course course) {
        return courseMapper.updateCourse(course);
    }

    @Override
    public Course findCourse(int id) {
        return courseMapper.findCourse(id);
    }

    @Override
    public List<Course> findAll() {
        return courseMapper.findAll();
    }
}