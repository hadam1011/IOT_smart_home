const Warning = () => {
    return (
        <div className="bg-slate-700 bg-opacity-40 absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
            <img src="https://cdn.pixabay.com/animation/2023/04/28/18/34/18-34-10-554_512.gif" alt="Warning GIF" />
            <audio id='audio'>
                <source src='https://res.cloudinary.com/dmllqeqdn/video/upload/v1701054224/warning.mp3' />
            </audio>
        </div>  
      );
}   

export default Warning;