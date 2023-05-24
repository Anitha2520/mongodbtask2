// Design database for Zen class programme

// inserting into users collection
db.users.insertMany([
    {
      "user_id": 1,
      "name": "Anitha",
      "email": "anitha@gmail.com",
      "mentor_id": 1,
    },
    {
      "user_id": 2,
      "name": "Anirutha",
      "email": "anirutha@gmail.com",
      "mentor_id": 1,
    },
    {
      "user_id": 3,
      "name": "Anitha K",
      "email": "anithak@gmail.com",
      "mentor_id": 1,
    },
    {
      "user_id": 4,
      "name": "vishnupriya",
      "email": "vishnupriya@gmail.com",
      "mentor_id": 2,
    },
    {
      "user_id": 5,
      "name": "sharmila",
      "email": "sharmila@gmail.com",
      "mentor_id": 2,
    },
  ]);
  // inserting into codekata collection 
  db.codekata.insertMany([
    {
      "user_id": 1,
      "no_of_problems_solved": 10,
    },
    {
      "user_id": 2,
      "no_of_problems_solved": 20,
    },
    {
      "user_id": 3,
      "no_of_problems_solved": 30,
    },
    {
      "user_id": 4,
      "no_of_problems_solved": 40,
    },
    {
      "user_id": 5,
      "no_of_problems_solved": 50,
    },
  ]);
  
  // inserting into attendance collection
  
  db.attendance.insertMany([
    {
      "user_id": 1,
      "topic_id": 1,
      "present": true,
    },
    {
      "user_id": 2,
      "topic_id": 2,
     "present": true,
    },
    {
      "user_id": 3,
      "topic_id": 3,
      "present": false,
    },
    {
      "user_id": 4,
      "topic_id": 4,
      "present": false,
    },
    {
      "user_id": 5,
      "topic_id": 5,
      "present": false,
    },
  ]);
  
  // inserting into topics collection
  db.topics.insertMany([
    {
      "topic_id": 1,
      "topic": "Javascript",
      "topic_date": new Date("2020-10-01"),
    },
    {
      "topic_id": 2,
      "topic": "HTML",
      "topic_date": new Date("2020-10-10"),
    },
    {
      "topic_id": 3,
      "topic": "CSS",
      "topic_date": new Date("2020-10-15"),
    },
    {
      "topic_id": 4,
      "topic": "React",
      "topic_date": new Date("2020-10-20"),
    },
    {
      "topic_id": 5,
      "topic": "Data Structures",
      "topic_date": new Date("2020-10-25"),
    },
  ]);
  
  // inserting into tasks collection
  db.tasks.insertMany([
    {
      "task_id": 1,
      'topic_id': 1,
      "user_id": 1,
      "task_name": "Javascript",
      "due_date": new Date("2020-10-05"),
      "submitted": true,
    },
    {
      "task_id": 2,
      'topic_id': 2,
      "user_id": 2,
      "task_name": "HTML",
      "due_date": new Date("2020-10-15"),
      "submitted": true,
    },
    {
      "task_id": 3,
      "topic_id": 3,
      "user_id": 3,
      "task_name": "CSS",
      "due_date": new Date("2020-10-20"),
      "submitted": false,
    },
    {
      "task_id": 4,
      "topic_id": 4,
      "user_id": 4,
      "task_name": "React",
      "due_date": new Date("2020-10-25"),
      "submitted": false,
    },
    {
      "task_id": 5,
      "topic_id": 5,
      "user_id": 5,
      "task_name": "Data Structures",
      "due_date": new Date("2020-10-30"),
      'submitted': false,
    },
  ]);
  
  // inserting into company drives collection
  db.company_drives.insertMany([
    {
      "user_id": 1,
      "drive_date": new Date("2021-10-05"),
      "company_name": "Securenext",
    },
    {
      "user_id": 2,
      "drive_date": new Date("2021-10-10"),
      "company_name": "TCS",
    },
    {
      "user_id": 2,
      "drive_date": new Date("2021-10-20"),
      "company_name": "CTS",
    },
    {
      "user_id": 3,
      "drive_date": new Date("2020-10-15"),
      "company_name": "Zoho",
    },
    {
      "user_id": 4,
      "drive_date": new Date("2021-10-30"),
      "company_name": "Oracle",
    },
  ]);
  
  // inserting into mentors collection
  db.mentors.insertMany([
    {
      "mentor_id": 1,
      "mentor_name": "Sanjay",
      "mentor_exp": 10,
    },
    {
      "mentor_id": 2,
      "mentor_name": "Saimohan",
      "mentor_exp": 9,
    },
    {
      "mentor_id": 3,
      "mentor_name": "Vishnu",
      "mentor_exp": 5,
    },
    {
      "mentor_id": 4,
      "mentor_name": "Ramya",
      "mentor_exp": 4,
    },
    {
      "mentor_id": 5,
      "mentor_name": "Ragav",
      "mentor_exp": 3,
    },
  ]);
  
  //1.Find all the topics and tasks which are thought in the month of October
  db.topics.aggregate( [    
    {
       $lookup: {
          from: "tasks",
          localField: "topic_id",    
          foreignField: "topic_id",  
          as: "fromItems"
       }
    },  
    {$project: {name: 1, topic:1,topic_date:1,topic_id:1,"fromItems.task_name":1, month: {$month: '$topic_date'}}},
    {$match: {month: 10}}  
    {$project: {fromItems: 0}},    
 ] )
        
//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find( { drive_date:{ $gte: new Date("2020-10-15"),$lte:new Date("2020-10-31")} })


//3.Find all the company drives and students who are appeared for the placement.
db.users.aggregate(
  {  
      $lookup: {
        from: 'company_drives',
        localField: 'user_id',
        foreignField: 'user_id',
        as: 'companydrives_students'
      }
    });
//4.Find the number of problems solved by the user in codekata
db.users.aggregate([ 
  {
    $lookup:{
      from:"codekata",
      localField:"user_id",
      foreignField:"user_id",
      as:"no_of_problems_solved_in_codekata"
    }
  },  
  { $project: {   
    "no_of_problems_solved_in_codekata.no_of_problems_solved": 1,
  }}
])  
db.users.aggregate(
  [ { $group : { _id : "$mentor_id" } } ]
)
 
//5.Find all the mentors with who has the mentee's count more than 15
db.users.aggregate([ 
  {
    $lookup:
    {
      from: "mentors",
      localField: "mentor_id",
      foreignField: "mentor_id",
      as: "mentorsdata"
    }
  },
  {
    $group: {
        _id: "$mentor_id",
        sum: {$sum : 1}
       
    }
},
{$match: {"sum":{"$gt" : 2}}} ,   
    {
        $project: {
            mentor_id: "$_id",
            StudentsCount: "$sum",
            MentorName: "$mentor_name",
        }

    }
])


//6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

  db.tasks.aggregate([    
    {
      $lookup:
      {
        from: "attendance",
        localField: "user_id",
        foreignField: "user_id",
        as: "attendancedata"
      } 
    },    
  {$match: { due_date:{ $gte: new Date("2020-10-15"),$lte:new Date("2020-10-31")} }},
  {$match : {"attendancedata.present" :false	}	},
  {$match : {submitted :false	}	},  
   {
     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$attendancedata", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { attendancedata: 0 } }   
  ])

