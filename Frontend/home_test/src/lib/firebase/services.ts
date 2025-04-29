type role = "admin" | "user";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import {app} from "./init"
const firestore = getFirestore(app);
import bcrypt from "bcrypt"
import { error } from "console";

export async function signup(
  userdata: { username: string; password: string; role: role },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("username", "==", userdata.username)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length>0) {
    callback({ status: false, message: "username already exists" });
  } else {
    userdata.password = await bcrypt.hash(userdata.password,10)
    await addDoc(collection(firestore,"users"), userdata).then(()=>{
        callback({status : true, message:"register success"})
    }).catch((error)=>{
        callback({status:false, message: error})
    })
    callback({ status: true, message: "register finish" });
  }
}
