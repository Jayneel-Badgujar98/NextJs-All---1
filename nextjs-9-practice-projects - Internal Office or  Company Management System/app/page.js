// "use client";
// import Image from "next/image";
// import { useState } from "react";

// export default function Home() {

//   const [allCheckboxes, setAllCheckboxes] = useState({ chk1: false, chk2: false, chk3: false, chk4: false });

//   const handleChange = () => {
//     const isAllChecked = allCheckboxes.chk1 && allCheckboxes.chk2 && allCheckboxes.chk3 && allCheckboxes.chk4;

//     const newValue = !isAllChecked;
//     setAllCheckboxes({
//       chk1: newValue,
//       chk2: newValue,
//       chk3: newValue,
//       chk4: newValue,
//     });
//   }
// return (
//   <div className="flex flex-col items-start ">
//     <label htmlFor="checkbox">Select all</label>
//     <input type="checkbox" checked={allCheckboxes.chk1 && allCheckboxes.chk2 && allCheckboxes.chk3 && allCheckboxes.chk4} onChange={handleChange} />
//     <br />
//     <input type="checkbox" checked={allCheckboxes.chk1} onChange={() => setAllCheckboxes({ ...allCheckboxes, chk1: !allCheckboxes.chk1 })} />
//     <input type="checkbox" checked={allCheckboxes.chk2} onChange={() => setAllCheckboxes({ ...allCheckboxes, chk2: !allCheckboxes.chk2 })} />
//     <input type="checkbox" checked={allCheckboxes.chk3} onChange={() => setAllCheckboxes({ ...allCheckboxes, chk3: !allCheckboxes.chk3 })} />
//     <input type="checkbox" checked={allCheckboxes.chk4} onChange={() => setAllCheckboxes({ ...allCheckboxes, chk4: !allCheckboxes.chk4 })} />
//   </div>
// );
// }
// "use client";
// import { useState } from "react";

// export default function Home() {
//   // Let's say you have 4 checkboxes
//   const totalCheckboxes = 4;
//   const [checkedList, setCheckedList] = useState(Array(totalCheckboxes).fill(false));

//   // Select All is checked if all checkboxes are checked
//   const allChecked = checkedList.every(Boolean);

//   // Handler for "Select All"
//   const handleSelectAll = (e) => {
//     const checked = e.target.checked;
//     setCheckedList(Array(totalCheckboxes).fill(checked));
//   };

//   // Handler for individual checkboxes
//   const handleCheckboxChange = (index) => (e) => {
//     const updatedList = [...checkedList];
//     updatedList[index] = e.target.checked;
//     setCheckedList(updatedList);
//   };

//   return (
//     <div className="flex flex-col items-start">
//       <label>
//         <input
//           type="checkbox"
//           checked={allChecked}
//           onChange={handleSelectAll}
//         />
//         Select all
//       </label>
//       <br />
//       {checkedList.map((checked, idx) => (
//         <label key={idx}>
//           <input
//             type="checkbox"
//             checked={checked}
//             onChange={handleCheckboxChange(idx)}
//           />
//           Checkbox {idx + 1}
//         </label>
//       ))}
//     </div>
//   );
// }


// "use client";
// import React, { useState } from 'react'

// const page = () => {
//     const [names, setNames] = useState([
//         { name: "John", checked: false },
//         { name: "Jane", checked: false },
//         { name: "Doe", checked: false },
//         { name: "Smith", checked: false }
//     ]);
//     const [name, setName] = useState("");
//     return (
//         <div>
//             <div>
//                 <input type="text" value = {name} onChange = {(e) => setName(e.target.value)} placeholder = "Search Name"/>
//             </div>
//             {names.filter(item => item.name.toLowerCase().includes(name.toUpperCase())).map((item,idx) => (
//                 <div key={idx} className='flex items-center gap-2'>{item.name}</div>
//             ))}
//             <div>all names</div>
//             {names.map((item, index) => (
//                 <div key={index} className='flex items-center gap-2'>{item.name}</div>))}
//         </div>
//     )
// }

// export default page
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page