import InquiryPopUpPostLayout from './InquiryPopUpPostLayout';
import React from 'react';
import {useLocation} from "react-router-dom";
import {Item} from '../../lib/interface';

export default function InquiryPopUpPost() {

  const location = useLocation();

  const data = location.state as Item;

  return <InquiryPopUpPostLayout></InquiryPopUpPostLayout>;
}
