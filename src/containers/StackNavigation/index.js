 import Draw from '@containers/Draw';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Login from '@containers/Login';
import Logout from '@containers/Login/Logout';
import ScanScreen from '@containers/Home/ScanScreen';
import ProductDetail from '@containers/History/ProductDetail';
import DetailCare from '@containers/CareSession/detailCare';
import AddCare from '@containers/CareSession/addCare';
import AddHarvest from '@containers/CareSession/addHarvest';
import AddCaregarden from '@containers/CareSession/addCaregarden';
import AddprotectProduct from '@containers/CareSession/addprotectProduct';
import AddFertilizer from '@containers/CareSession/addFertilizer';
import AddProcedure from '@containers/CareSession/addProcedure';
const AppNavigator = createStackNavigator(
    {
        // Main,
        Draw,
        Login,
        ProductDetail,
        ScanScreen,
        Logout,
        DetailCare,
        AddCare,
        AddHarvest,
        AddCaregarden,
        AddprotectProduct,
        AddFertilizer,
        AddProcedure
    },
    {
        headerMode: 'none',
        initialRouteName: 'Draw',
        // initialRouteName: 'ProductDetail',
        mode: 'modal',
        defaultNavigationOptions: {
            // cardOverlayEnabled: true,
            // ...TransitionPresets.SlideFromRightIOS,
        },
    }
);

export default createAppContainer(AppNavigator);
