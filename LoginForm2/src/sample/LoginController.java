package sample;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.io.File;
import java.net.URL;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ResourceBundle;

public class LoginController implements Initializable {

    @FXML
    private ImageView imgMotelView;
    @FXML
    private ImageView imgLockView;
    @FXML
    private TextField txtFldUsername;
    @FXML
    private PasswordField txtFldPassword;
    @FXML
    private Button btnLogin;
    @FXML
    private Button btnRegister;
    @FXML
    private Button btnCancel;
    @FXML
    private Label lblLoginProcess;

    /**
     * @param location of the img
     * @param resources for future needs
     * Loads the images
     */
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        File fileMotel = new File("img/Motel.jpg");
        Image imgMotel = new Image(fileMotel.toURI().toString());
        imgMotelView.setImage(imgMotel);

        File fileLock = new File("img/lock-icon-vector-illustration.jpg");
        Image imgLock = new Image(fileLock.toURI().toString());
        imgLockView.setImage(imgLock);

        btnRegister.setOnKeyPressed(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {
                if (event.getCode().equals(KeyCode.ENTER)){
                    register();
                }
            }
        });
        btnRegister.focusedProperty();

        btnLogin.setOnKeyPressed(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {
                if (event.getCode().equals(KeyCode.ENTER)){
                    login();
                }
            }
        });

        btnCancel.setOnKeyPressed(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {
                if (event.getCode().equals(KeyCode.ENTER)){
                    closeStage();
                }
            }
        });

        btnRegister.setOnKeyPressed(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {
                if (event.getCode().equals(KeyCode.ENTER)){
                    register();
                }
            }
        });
    }

    public void setBtnRegisterAction(ActionEvent event) {
        register();
    }
    public void setBtnLoginAction(ActionEvent event) {
        login();
    }
    public void setBtnCancelAction(ActionEvent event){
        closeStage();
    }

    public void register(){
        try {
            Parent root = FXMLLoader.load(getClass().getResource("RegisterView.fxml"));
            Stage stageRegister = new Stage();
            stageRegister.initStyle(StageStyle.UNDECORATED);
            stageRegister.setScene(new Scene(root, 520, 480));
            stageRegister.show();
        } catch (Exception e) {
            e.printStackTrace();
            e.getCause();
        }
    }

    public void login(){
        if (!(txtFldUsername.getText().isEmpty() && txtFldPassword.getText().isEmpty())){
            validateLogin();
        } else {
            lblLoginProcess.setText("You must enter a username and password!");
        }
    }

    public void closeStage(){
        Stage stage = (Stage) btnCancel.getScene().getWindow();
        stage.close();
        Platform.exit();
    }

    private void validateLogin() {
        DatabaseConnection databaseConnection = new DatabaseConnection();
        Connection connectDB = databaseConnection.getConnection();

        String verifyLogin = "SELECT count(1) FROM tbluseraccount WHERE username = '" + txtFldUsername.getText() + "' AND password = '" + txtFldPassword.getText() + "';";

        try {
            Statement statement = connectDB.createStatement();
            ResultSet resultSet = statement.executeQuery(verifyLogin);
            while (resultSet.next()){
                if (resultSet.getInt(1) == 1) {
                    lblLoginProcess.setText("Welcome " + txtFldUsername.getText());
                } else {
                    lblLoginProcess.setText("Invalid username or password. Pleas try again!");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            e.getCause();
        }
    }
}
