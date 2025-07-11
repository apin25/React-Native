// components/Card.tsx

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface JobCardProps {
  role: string;
  company: string;
  location: string;
  logo: string;
}

const Card: React.FC<JobCardProps> = ({ role, company, location, logo}) => {
  return (
    <View style={{backgroundColor:"white", borderRadius:12, padding:12, marginBottom:12, elevation:8}}>
        <View style={{alignItems:"center", flexDirection:"row", justifyContent:"space-between", paddingRight:24, width:'100%'}}>
            <Image source={{ uri: logo }} style={{width:32, height:32, borderRadius:12, marginBottom:12}} />
            <Text style={{ fontSize: 24 }}>⋮</Text>
        </View>
      <Text style={{fontWeight:"bold", fontSize:24}}>{role}</Text>
      <Text style={{color:"#666"}}>{company} – {location}</Text>

      <View style={{flexDirection:"row", flexWrap:"wrap", marginTop:12, gap:8}}>
        <Text style={{backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, fontSize: 12,marginRight: 8}}>Design</Text>
        <Text style={{backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, fontSize: 12,marginRight: 8}}>Full time</Text>
        <Text style={{backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, fontSize: 12,marginRight: 8}}>Senior designer</Text>
      </View>
      <View style={{alignItems:"center", flexDirection:"row", justifyContent:"space-between", paddingRight:24, width:'100%', marginTop:12}}>
            <Text style={{ fontSize: 12 }}>12 days ago</Text>
            <Text style={{ fontWeight:"bold"}}>12K<Text style={{fontWeight:"normal", marginTop:12, color:"#2e2e2e"}}>/mo</Text></Text>
        </View>
    </View>
  );
};


export default Card;
