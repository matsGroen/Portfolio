package sample;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.stage.Stage;

import java.io.File;
import java.net.URL;
import java.sql.Connection;
import java.sql.Statement;
import java.util.ResourceBundle;

public class RegisterController implements Initializable {

    @FXML
    private ImageView imgLogoView;
    @FXML
    private Button btnClose;
    @FXML
    private Button btnRegister;
    @FXML
    private Label lblRegristrationProcess;
    @FXML
    private PasswordField txtFldPassword;
    @FXML
    private PasswordField txtFldConfirmPassword;
    @FXML
    private TextField txtFldFirstname;
    @FXML
    private TextField txtFldLastname;
    @FXML
    private TextField txtFldUsername;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        File fieldLogo = new File("img/imgRegister.png");
        Image imgLogo = new Image(fieldLogo.toURI().toString());
        imgLogoView.setImage(imgLogo);

        btnRegister.setOnKeyPressed(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {
                if (event.getCode().equals(KeyCode.ENTER)){
                    registerUser();
                }
            }
        });

        btnClose.setOnKeyPressed(new EventHandler<KeyEvent>() {
            @Override
            public void handle(KeyEvent event) {
                if (event.getCode().equals(KeyCode.ENTER)){
                    closeStage();
                }
            }
        });
    }

    public void setBtnRegisterAction(ActionEvent event){
        registerUser();
    }

    public void setBtnCloseAction(ActionEvent event){
        closeStage();
    }

    private void closeStage(){
        Stage stage = (Stage) btnClose.getScene().getWindow();
        stage.close();
    }
    public void registerUser(){
        if (txtFldPassword.getText().equals(txtFldConfirmPassword.getText())) {
            if (!(txtFldFirstname.getText().isEmpty() &&
                    txtFldLastname.getText().isEmpty() &&
                    txtFldUsername.getText().isEmpty())) {
                DatabaseConnection connectNow = new DatabaseConnection();
                Connection connectDB = connectNow.getConnection();

                String firstname = txtFldFirstname.getText();
                String lastname = txtFldLastname.getText();
                String username = txtFldUsername.getText();
                String password = txtFldPassword.getText();

                String insertFields = "INSERT INTO tbluseraccount(lastname, firstname, username, password) values ('";
                String insertValues = firstname + "','" + lastname + "','"  + username + "','"  + password + "')" ;
                String insertToRegister = insertFields + insertValues;

                try {
                    Statement statement = connectDB.createStatement();
                    statement.executeUpdate(insertToRegister);
                    lblRegristrationProcess.setText("User has been registered successfully!");
                } catch (Exception e) {
                    e.printStackTrace();
                    e.getCause();
                }
            } else {
                lblRegristrationProcess.setText("You must fill out all fields!");
            }
        } else {
            lblRegristrationProcess.setText("Password does not match!");
        }

    }
}
