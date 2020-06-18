import { URL } from "./config";
async function getAllDocs(
  collection: "users" | "projects" | "tasks" | "subCategories" | "hours"
) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/${collection}`, {
    headers: {
      "auth-token": token!,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function getDocById(
  collection: "users" | "projects" | "tasks" | "subCategories" | "hours",
  id: String
) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/${collection}/${id}`, {
    headers: {
      "auth-token": token,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));
  return data;
}
async function addDoc(
  collection: "users" | "projects" | "tasks" | "subCategories" | "hours",
  body: Object
) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/${collection}`, {
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function deleteDocById(
  collection: "users" | "projects" | "tasks" | "subCategories" | "hours",
  id: String
) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/${collection}/${id}`, {
    headers: {
      "auth-token": token,
    },
    mode: "cors",
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function editDocById(
  collection: "users" | "projects" | "tasks" | "subCategories" | "hours",
  id: String,
  body: JSON
) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/${collection}/${id}`, {
    headers: {
      "auth-token": token!,
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function getSubCategoriesByProject(projectID: String) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/subCategories/project/${projectID}`, {
    headers: {
      "auth-token": token!,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function getTasksBySubCategory(scID: String) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/tasks/sc/${scID}`, {
    headers: {
      "auth-token": token!,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function getTasksByProject(projectId: String) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/tasks/project/${projectId}`, {
    headers: {
      "auth-token": token!,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function getTasksByUser(id: String) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/tasks/user/${id}`, {
    headers: {
      "auth-token": token!,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function getHoursByTask(id: String) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/hours/task/${id}`, {
    headers: {
      "auth-token": token!,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function getHoursByUser(id: String) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/hours/user/${id}`, {
    headers: {
      "auth-token": token!,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}

async function addUserToProject(userID, projectID) {
  const projRes = await getDocById("projects", projectID);
  const userRes = await getDocById("users", userID);
  const project = projRes.results;
  const user = userRes.results;
  const { users } = project;
  const { projects } = user;

  if (isIn(projects,project._id))
  {
    return ({
      message : "already in the project"
    })
  }
  const updatedProject = {
    ...project,
    users: [...users, user._id],
  };


  const updateduser = { ...user, projects: [...projects, project._id] };
  const res1 = await editDocById("users", user._id, updateduser);
  const res2 = await editDocById("projects", project._id, updatedProject);
  const ret = {
    success: true,
    project: res2.results,
    user: res1.results,
  };
  return ret;
}
async function addSubCategoryToProject(projectID: String, body: Object) {
  const projRes = await getDocById("projects", projectID);
  const project = projRes.results;
  if (project) {
    const scBody = { ...body, projectId: project._id };
    const sc = await addDoc("subCategories", scBody);
    const ret = {
      success: true,
      subCategory: sc.results,
    };
    return ret;
  }
  const ret = {
    success: false,
    subCategory: null,
  };
  return ret;
}
async function addUserToSubCategory(userID, scId) {
  const scRes = await getDocById("subCategories", scId);
  const userRes = await getDocById("users", userID);
  const sc = scRes.results;
  const user = userRes.results;
  if (sc && user) {
    const { users } = sc;
    const updatedSc = { ...sc, users: [...users, user._id] };
    const res1 = await editDocById("subCategories", sc._id, updatedSc);
    const ret = {
      success: true,
      subCategory: res1.results,
      user: user,
    };
    return ret;
  }
  const ret = {
    success: false,
  };
  return ret;
}
async function addTaskToSubCategory(scId, data) {
  const scRes = await getDocById("subCategories", scId);
  const sc = scRes.results;
  const updatedTask = {
    ...data,
    projectId: sc.projectId,
    subCategoryId: sc._id,
  };
  const res2 = await addDoc("tasks", updatedTask);
  const ret = {
    success: true,
    task: res2.results,
  };
  return ret;
}
async function affectTaskToUser(userId, taskId) {
  const userRes = await getDocById("users", userId);
  const taskRes = await getDocById("tasks", taskId);
  const user = userRes.results;
  const task = taskRes.results;
  if (!user) {
    const ret = {
      success: false,
      message: "user doesn't exist",
    };
    return ret;
  }
  if (!task) {
    const ret = {
      success: false,
      message: "task doesn't exist",
    };
    return ret;
  }
  const updatedTask = {
    ...task,
    userId: user._id,
  };
  const res2 = await editDocById("tasks", task._id, updatedTask);
  const ret = {
    success: true,
    task: res2.results,
  };
  return ret;
}
async function addHourToUser(scId, taskId, userId, startDate, endDate) {
  const scRes = await getDocById("subCategories", scId);
  const userRes = await getDocById("users", userId);
  const taskRes = await getDocById("tasks", taskId);
  const sc = scRes.results;
  const user = userRes.results;
  const task = taskRes.results;
  if (!sc) {
    const ret = {
      success: false,
      message: "sub category doesn't exist",
    };
    return ret;
  }
  if (!user) {
    const ret = {
      success: false,
      message: "user doesn't exist",
    };
    return ret;
  }
  if (!task) {
    const ret = {
      success: false,
      message: "task doesn't exist",
    };
    return ret;
  }
  const { hours } = sc;
  const body = {
    projectId: sc.projectId,
    taskId: taskId,
    startDate: startDate,
    doneDate: endDate,
    userId: userId,
  };
  const hour = await addDoc("hours", body);
  const updateduser = {
    ...user,
    hours: [...hours, hour],
  };
  const updatedSc = { ...sc, hours: [...hours, hour._id] };
  const res1 = await editDocById("subCategories", sc._id, updatedSc);
  const res2 = await editDocById("users", user._id, updateduser);
  const ret = {
    success: true,
    subCategory: res1.results,
    user: res2.results,
  };
  return ret;
}
async function login(email: String, password: String) {
  let response;
  let body = { email, password };
  await fetch(`${URL}/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => (response = data));
  if (response.token)
  localStorage.setItem("auth-token", response.token);
  if (response.id)
  localStorage.setItem("id", response.id);
  if (response.userRole)
  localStorage.setItem("userRole", response.userRole);
  return response;
}
function signOut() {
  localStorage.removeItem("auth-token");
  localStorage.removeItem("id");
  localStorage.removeItem("userRole");

  return { success: true };
}
async function register(data) {
  const token = localStorage.getItem("auth-token");
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}
async function confirmUser(id: String) {
  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/confirm/${id}`, {
    headers: {
      "auth-token": token,
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));
  return data;
}
function isIn(l, id) {
  return l.includes(id);
}
async function addTask(
  label,
  status,
  locked,
  projectId,
  subCategoryId,
  startDate,
  endDate
) {
  const id = localStorage.getItem("id");
  const project = await getDocById("projects", projectId);

  if (!isIn(project.results.users, id))
    return {
      success: false,
      message: "you are not working on project with id=" + projectId,
    };
  const body = {
    label,
    status,
    locked,
    userId: id,
    projectId,
    subCategoryId,
    startDate,
    endDate,
  };

  const token = localStorage.getItem("auth-token");
  let data;
  await fetch(`${URL}/api/tasks`, {
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((docs) => (data = docs));

  return data;
}
async function MarkTaskAsDone(taskId, endDate) {
  const id = localStorage.getItem("id");
  const taskRes = await getDocById("tasks", taskId);
  const task = taskRes.results;

  const body = { ...task, status: "terminé", actualEndDate: endDate };

  const token = localStorage.getItem("auth-token");
  const res = await editDocById("tasks", taskId, body);

  return res.results;
}

async function getProjectsByUser(id : String)
{
    const userRes = await getDocById("users",id)
    const user=userRes.results
    const results=user.projects
    let projects=[]
    for (let i=0 ; i<results.length ; i++)
    {
      let project=await getDocById("projects",results[i])
      projects.push(project.results)
    }
    const ret = {
      success: true,
      results : projects
    };
    return ret
}
export {
  getAllDocs,
  login,
  register,
  getDocById,
  addDoc,
  deleteDocById,
  editDocById,
  addUserToProject,
  addSubCategoryToProject,
  addUserToSubCategory,
  addHourToUser,
  affectTaskToUser,
  getSubCategoriesByProject,
  getProjectsByUser,
  getTasksBySubCategory,
  getTasksByUser,
  getTasksByProject,
  getHoursByUser,
  getHoursByTask,
  signOut,
  confirmUser,
  MarkTaskAsDone,
  addTask,
};