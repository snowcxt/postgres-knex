SELECT id, name FROM student

﻿SELECT json_agg(t)
FROM (SELECT id, name FROM student) AS t

SELECT
	id,
	name,
	room,
	(SELECT json_agg(t)
	FROM (SELECT id, name
				FROM student
					JOIN student__class ON student__class.student = student.id
				WHERE student__class.class = class.id) AS t) AS attendees
FROM class
