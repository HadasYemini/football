import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useUsers } from '../context/UsersContext';

export default function AddPlayer() {
    const navigate = useNavigate();
    const { currentUser, addPlayerToTeam } = useUsers();

    function validLineup(playerData) {
        return !(playerData.in && currentUser?.players.filter((player) => player.in).length >= 11)
    }

    function onSubmit(e) {
        e.preventDefault();
        const playerData = Object.fromEntries(new FormData(e.target).entries());
        playerData.in = playerData.in === 'on'
        
        if (validLineup(playerData)) {
            addPlayerToTeam(playerData)
            navigate('/team');
            alert('The player has been added')
        } else {
            alert('The player has not been added')
        }
    }

    return (
        <div className="flex">
            <Navbar />
            <div className='flex flex-col flex-grow p-6 ml-36 items-center mt-6 space-y-10'>
                <h1 className="text-4xl font-bold mb-4 text-center">{currentUser.teamName}</h1>
                <form onSubmit={onSubmit} className="w-full flex flex-col items-center mt-6 space-y-5">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                        minLength="1"
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                    />
                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        required
                        min="18"
                        max="60"
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                    />
                    <div>
                        <label htmlFor="in" className="mr-4">In lineup?</label>
                        <input
                            type="checkbox"
                            name="in"
                            id="in"
                        />
                    </div>
                    <input
                        name="goals"
                        type="number"
                        placeholder="Goals"
                        min='0'
                        required
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                    />
                    <input
                        name="assits"
                        type="number"
                        placeholder="Assits"
                        min='0'
                        required
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                    />
                    <button type='submit' className="bg-yellow-200 rounded-none font-bold mt-10 px-4 py-2">
                        Add Player
                    </button>
                </form>
            </div>
        </div>
    );
}
