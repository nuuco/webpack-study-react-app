import { Form, Discussions } from './components'
import { useEffect, useState } from "react";
import { agoraStatesDiscussions } from "./data";

const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");

function App() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    getDiscussion();
  }, [])

  const getDiscussion = (() => {
    let data;
    if (dataFromLocalStorage) {
      data = JSON.parse(dataFromLocalStorage);
    } else {
      data = agoraStatesDiscussions.slice();
    }
    setDiscussions(data);
  })

  const addDiscussion = ({ title, author, bodyText }) => {
    const newDiscussion = {
      id: new Date().toISOString() + author,
      createdAt: new Date().toISOString(),
      title: title,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: author,
      answer: null,
      bodyHTML: bodyText,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    };
    setDiscussions([newDiscussion, ...discussions]);
    // 로컬스토리지에 저장
    localStorage.setItem("agoraStatesDiscussions", JSON.stringify([newDiscussion, ...discussions]));
  }

  const deleteDiscussion = ((id) => {
    const filtered = discussions.filter(el => el.id !== id);
    setDiscussions(filtered);
    localStorage.setItem("agoraStatesDiscussions", JSON.stringify(filtered));
  }) 

  return (
    <>
      <h1>My Agora States</h1> 
      <Form addDiscussion={addDiscussion}></Form>
      <Discussions discussions={discussions} deleteDiscussion={deleteDiscussion}></Discussions>
    </>
  );
}

export default App;
