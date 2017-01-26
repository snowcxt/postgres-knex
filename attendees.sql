SELECT id, name FROM student;

SELECT json_agg(t)
FROM (SELECT id, name FROM student) AS t;

SELECT
	id,
	name,
	room,
	(SELECT json_agg(t)
	FROM (SELECT id, name
				FROM student
					JOIN student__course ON student__course.student = student.id
				WHERE student__course.course = course.id) AS t)
FROM course;
