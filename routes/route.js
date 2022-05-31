import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// pages
import SplaceScreenPage from '../pages/splaceScreen';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import HomePage from '../pages/homeScreen';
import ViewHistory from '../pages/viewhistory';
import FromPenitipanRumah from '../pages/penitianRumah';
import FromPenitipanPerhiasan from '../pages/penitipanPerhiasan';
import FromPenitipanKendaraan from '../pages/penitipanKendaraan';
import FromPenitipanBarang from '../pages/penitipanBarang';
import Profile from '../pages/profile';
import DashboardAdmin from '../pages/Dashboard/dashboard';
import dataPengajuan from '../pages/Dashboard/daftarPengajuan';
import riwayatPenitipan from '../pages/Dashboard/riwayatPenitipan';
import viewPengajuan from '../pages/Dashboard/viewPengajuan';
import viewPembaruan from '../pages/Dashboard/viewPembaruan';

const screens = {
    SplaceScreen: {
        screen: SplaceScreenPage,
        navigationOptions: {
            headerShown: false,
        }
    },
    Login: {
        screen: LoginPage,
        navigationOptions: {    
            headerShown: false,
        }
    },
    Register: {
        screen: RegisterPage,
        navigationOptions: {
            headerShown: false,
        }
    },
    Home: {
        screen: HomePage,
        navigationOptions: {
            headerShown: false,
        }
    },
    ViewHistory: {
        screen: ViewHistory,
        navigationOptions: {
            headerShown: false,
        }
    },
    FromPenitipanRumah: {
        screen: FromPenitipanRumah,
        navigationOptions: {
            headerShown: false,
        }
    },
    FromPenitipanPerhiasan: {
        screen: FromPenitipanPerhiasan,
        navigationOptions: {
            headerShown: false,
        }
    },
    FromPenitipanKendaraan: {
        screen: FromPenitipanKendaraan,
        navigationOptions: {
            headerShown: false,
        }
    },
    FromPenitipanBarang: {
        screen: FromPenitipanBarang,
        navigationOptions: {
            headerShown: false,
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false,
        }
    },
    DashboardAdmin: {
        screen: DashboardAdmin,
        navigationOptions: {
            headerShown: false,
        }
    },
    dataPengajuan: {
        screen: dataPengajuan,
        navigationOptions: {
            headerShown: false,
        }
    },
    riwayatPenitipan: {
        screen: riwayatPenitipan,
        navigationOptions: {
            headerShown: false,
        }
    },
    viewPengajuan: {
        screen: viewPengajuan,
        navigationOptions: {
            headerShown: false,
        }
    },
    viewPembaruan: {
        screen: viewPembaruan,
        navigationOptions: {
            headerShown: false,
        }
    }
}

const RoutesStack = createStackNavigator(screens);
export default createAppContainer(RoutesStack);