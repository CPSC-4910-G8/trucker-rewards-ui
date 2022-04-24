import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemButton
} from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
import {Link} from 'react-router-dom';

/* Note here that this needs something else passed to the second argument */

// const DriverReport = (props) => {
//     const [userData,setUserData]=useState([])
//     useEffect( () => { 
//         axios
//         .get("/api/company/:id/drivers",'sponsor something',)
//         .then(res => {
//             setUserData = res.data; 
//         });
//     }, []);

//     const [checked, setChecked] = React.useState([1]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   /* Here on submit there would be a way to see which items were checked then it would pass that info to the page that actually makes the report. */ 
//   const handleSubmit = (event) => {
//   }

//   let DriverList =  userData.map((data,id) => {
//       return (
//           <ListItem
//             key={value}
//             secondaryAction={
//               <Checkbox
//                 edge="end"
//                 onChange={handleToggle(value)}
//                 checked={checked.indexOf(value) !== -1}
//                 inputProps={{ 'aria-labelledby': labelId }}
//               />
//             }
//             disablePadding
//           >
//         <ListItemButton>
//         <ListItemText primary = {data.firstname} />
//         </ListItemButton>
//           </ListItem>
//       )
//   })

//     return (
//         <>
//         <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//             {DriverList}
//         </List>
//         <Button variant="contained"> Generate Report </Button>

//         </>
        
//     )

// /*
//   <h1> Generate Driver Reports </h1>
//         <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//         userData.map((data,id) => {
//             return 
//                 <ListItem
//                 key={value}
//                 secondaryAction={
//                     <Checkbox
//                     edge="end"
//                     onChange={handleToggle(value)}
//                     checked={checked.indexOf(value) !== -1}
//                     inputProps={{ 'aria-labelledby': labelId }}
//                     />
//                 }
//                 disablePadding
//                 >
//             <ListItemButton>
//             <ListItemText primary = {data.firstname} />
//             </ListItemButton>
//                 </ListItem>
//         })
//         </List>

// */
// }

// export default DriverReport
