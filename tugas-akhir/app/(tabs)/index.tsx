
import Card from '@/components/Card';
import SplashScreen from '../splash';
import React from 'react';

export default function HomeScreen() {
  return (
    <>
   <SplashScreen/>
   <Card id= "1" title="Software Engineer" job_position="Senior" company="PT KerjaKu Indo" employment_type='Full time' description='buat kamu yang mau melamar sebagai lalalallala maka lalalalalalalal' close_at={new Date('2022-01-22')}/>
   </>
  );
}

