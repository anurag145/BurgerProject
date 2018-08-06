import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter:new Adapter()})
describe('<NavigationItems/>',()=>{
  let wrapper;
  beforeEach(()=>{
    
    wrapper = shallow(<NavigationItems />);
  });
    it('should render two <NavigaionItems/> elements if not authenticated',()=>{
     
      expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigaionItems/> elements if authenticated',()=>{
     wrapper.setProps({isAuthenticated:true})
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should contain logout',()=>{
     wrapper.setProps({isAuthenticated:true})
      expect(wrapper.contains(<NavigationItem link='/logout'>LogOut</NavigationItem>)).toEqual(true)
    });
    it('should not contain logout',()=>{
     wrapper.setProps({isAuthenticated:false})
      expect(wrapper.contains(<NavigationItem link='/logout'>LogOut</NavigationItem>)).toEqual(false)
    });
});